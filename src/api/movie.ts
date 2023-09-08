import axios ,{AxiosResponse} from 'axios';

type NowPlayingData = any;
type MovieDetailData = any;

const REST_API_ADDR = axios.create ({
    baseURL : "https://api.themoviedb.org/3/",
    params : {
        language : "KO-KR",
        api_key : "353b43f81ebb89f55c9a64ba6236a3a5"

    },
});

export const homeApi = {
  nowPlaying: (): Promise<AxiosResponse<NowPlayingData>> => REST_API_ADDR.get("movie/now_playing"),

  movieDetail: (id: number): Promise<AxiosResponse<MovieDetailData>> =>
    REST_API_ADDR.get(`movie/${id}`, {
      params: { append_to_response: "videos" },
    }),
};