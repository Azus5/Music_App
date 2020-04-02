import * as RNFS from 'react-native-fs';
import { PermissionsAndroid } from 'react-native';

async function getPermission() {
    const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
}

//Verifica se há permissião para leitura dos arquivos
async function havePermission() {
    const response = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    return response;
}

//Há diretorios nesse path?
async function getDir(path) {
    return await RNFS.readDir(path).then(files => {
        let dirs = {
            haveFolders: false,
            folders: [],
        };
        for(let file of files) {
            if (file.isDirectory()) {
                dirs.haveFolders = true;
                dirs.folders.push(file);
            };
        }
        return dirs;
    });
}

//Verifica se há algum arquivo .mp3 no caminho informado
async function getMP3(path) {
    const folder = await RNFS.readDir(path).then(files => {
        //Pega o nome da pasta aonde os arquivos estão
        if(files.length !== 0) {
            let parentFolder = files[0].path.slice(0, files[0].path.length - files[0].name.length - 1);
            parentFolder = parentFolder.slice(parentFolder.lastIndexOf('/') + 1);

            let pathOfFolder = files[0].path.slice(0, files[0].path.length - files[0].name.length - 1);
            //Representa a pasta
            const thisPaste = {
                folderName: parentFolder,
                path: pathOfFolder,
                haveMP3: false,    
                mp3: [],
            }

            files.forEach(file => {
                if(file.name.search('.mp3') !== -1) {
                    thisPaste.haveMP3 = true;
                    thisPaste.mp3.push(file.path);
                }
            })

            return thisPaste;
        } else {
            return {
                haveMP3: false,
            }
        }
    }).then(response => response);
    return folder;
}

async function checkAllOfDirectory(rootFolder) {
    const mp3 = [];

    await RNFS.readDir(rootFolder).then(async function (files) {
        //Pega todos os .mp3 da pasta ROOT('0')
        const rootDir = await getMP3(rootFolder);
        if (rootDir.haveMP3) mp3.push(rootDir);

        //Entra em todas as pastas e pega os .mp3 dentro delas
        for(const file of files) {
            if(file.isDirectory()) {
                let folderMP3 = await getMP3(file.path)
                if(folderMP3.haveMP3) {
                    mp3.push(folderMP3);
                    console.log(`Added ${folderMP3.mp3.length} MP3 files, from: ${folderMP3.path}`);
                }
                let folders = await getDir(file.path);
                if(folders.haveFolders) {
                    for(let folder of folders.folders) {
                        let folderMP3 = await getMP3(folder.path)
                        if(folderMP3.haveMP3) {
                            mp3.push(folderMP3);
                            console.log(`Added ${folderMP3.mp3.length} MP3 files, from: ${folderMP3.path}`);
                        }
                    }
                }
            }
        }
    })
    return mp3;
}

async function getPaths() {
    await havePermission()
    .then(async function(response) {
        if(!response) {
            await getPermission();
        } else return await checkAllOfDirectory(RNFS.ExternalStorageDirectoryPath);    
    })
    .catch(err => {
        console.log(err.message, err.code);       
    });
}

export default getPaths;