import axios from "axios";

export const fetchSearchResult = async (searchQuery: String, config: object) => {
    //console.log('https://api.spotify.com/v1/search?q=' + searchQuery + '&type=track')
    const response = await axios.get('https://api.spotify.com/v1/search?q=' + searchQuery + '&type=track', config)
    //console.log(response.data)
    return response.data.tracks.items
}

export const tracksToCardDetails = (tracks: any) => {
    return tracks.map((track: any) => {
        const name = track.name;
        const image = track.album.images[0].url
        let artistsAsString = ""
        track.artists.forEach((artist: any)  => {
            artistsAsString += artist.name + " "
        });
        const creator = artistsAsString
        const id = track.id
        return {
            name: name,
            image: image,
            creator: creator,
            id: id,
            isTrack: true
        }
    });
}

export const fetchTrack = async (trackId: string, config: object) => {
    //console.log(`https://api.spotify.com/v1/tracks/${trackId}`)
    const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, config)
    return response.data
}