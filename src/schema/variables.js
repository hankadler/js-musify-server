import Song from "./Song";
import Album from "./Album";
import Artist from "./Artist";

const variables = { ...Song.variables, ...Album.variables, ...Artist.variables };

export default variables;
