import {WaveFile} from "audioFile";

export function renderAudioFile(waveFile:WaveFile, scaleFactor = 3.0, {width, height} = {width: 300, height: 300}) {
    let result = `0, ${height / 2 } `;
    const pixelToData = waveFile.dataLength / width;
    const waveData = waveFile.data;
    //const normalize =
    for (let x = 0; x < width; ++x) {
        const nextPt = waveData[(x * pixelToData) >> 0];
        let scaledPt;
        if (waveFile.bitsPerSample == 16) {
            scaledPt = (nextPt / 32768) * (height / 2) * scaleFactor;
        } else if (waveFile.bitsPerSample == 8) {
            scaledPt = ((nextPt - 128) / 128) * (height / 2) * scaleFactor;
        }
		    result += `${x}, ${height / 2 + scaledPt} `;
    }
    
    return result;
}
