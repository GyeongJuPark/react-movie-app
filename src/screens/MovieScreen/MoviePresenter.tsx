import { HelmetProvider, Helmet } from "react-helmet-async";
import Loader from "../../components/Loader/Loader";
import Poster from "../../components/Poster/Poster";
import Section from "../../components/Section/Section";
import styles from './Movie.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import React, {useState, useEffect} from "react";
import useInfiniteScroll from "../../utils/usetInfiniteScroll";
import { moviesApi } from "../../api/movie";
import uniqBy from "lodash/uniqBy";
import path from "path";

interface MoviePresenterProps {
    nowPlaying: any[] | null;
    upcoming: any[] | null;
    popular: any[] | null;
    topRated: any[] | null;
    error: string | null;
    loading : boolean;
    popularInfinite: any[] | null;
    nowPlayingInfinite: any[] | null;
    upcomingInfinite: any[] | null;
    topRatedInfinite: any[] | null;
}


const MoviePresenter : React.FC<MoviePresenterProps>=({
    nowPlaying,
    upcoming,
    popular,
    topRated,

    loading,

    nowPlayingInfinite,
    popularInfinite,
    upcomingInfinite,
    topRatedInfinite
    
})=>{
    const { location : {pathname}} = window;

    const [popularMovies, setpopularMovies] = useState<any[]>([]);
    const [ nowPlayingMovies, setnowPlayingMovies] = useState<any[]>([]);
    const [ upcomingMovies, setupcomingMovies] = useState<any[]>([]);
    const [ topRatedMovies, settopRatedMovies] = useState<any[]>([]);

    const page = useInfiniteScroll();

    // 비동기처리
    const getInfiniteApi = async() : Promise<void> => {
      if(page !== 1){
        try{
          let newMovies : any[] = [];
          if(pathname === "/movie"){
            const { data } = await moviesApi.popularInfinite(page);
            newMovies = data.results;
          }
          else if(pathname === "/movie/now-playing"){
            const { data } = await moviesApi.nowPlayingInfinite(page);
            newMovies = data.results;
          }
          else if(pathname === "/movie/upcoming"){
            const { data } = await moviesApi.upcomingInfinite(page);
            newMovies = data.results;
          }
          else if(pathname === "/movie/top-rated"){
            const { data } = await moviesApi.topRatedInfinite(page);
            newMovies = data.results;
          }

          const totalMovies = [...popularMovies, ...newMovies];
          const uniqByMovies = uniqBy(totalMovies, "id");

          if(pathname === "/movie"){
            setpopularMovies(uniqByMovies);
          }else if(pathname === "/movie/now-playing"){
            setnowPlayingMovies(uniqByMovies);
          }else if(pathname === "/movie/upcoming"){
            setupcomingMovies(uniqByMovies);
          }else if(pathname === "/movie/top-rated"){
            settopRatedMovies(uniqByMovies);
          }

        }
        catch(err){
          console.log(err);
        }
      }
    }
    
    useEffect(()=>{
      getInfiniteApi();
    },[page]);

    return loading ? (
        <Loader/>
      ) :
      (
        <div className={styles.Container}>
      <HelmetProvider>
        <Helmet>
          <title>넷플릭스 - 영화</title>
        </Helmet>
      </HelmetProvider>

      {/* Rest of your JSX code... */}
      {popular && popular.length > 0 && pathname === "/movie" && (
        <div className={styles.TitleContainer}>
          <div className={styles.TitleContent}>
            <h1 className={styles.Title}>인기영화</h1>
            <p className={styles.SubTitle}>
              현재 인기 있는 영화 목록을 가져옵니다.
              <br />
              영화 목록은 매일 자동 업데이트 됩니다.
            </p>
          </div>
        </div>
      )}

            {/* Rest of your JSX code... */}
            {popular && popular.length > 0 && pathname === "/movie/top-rated" && (
        <div className={styles.TitleContainer}>
          <div className={styles.TitleContent}>
            <h1 className={styles.Title}>상영 예정인 영화</h1>
            <p className={styles.SubTitle}>
              상영 예정인 영화 목록을 가져옵니다.
              <br />
              지정된 날짜 내에서 앞으로 상영 예정인 영화를 찾습니다.
            </p>
          </div>
        </div>
      )}

            {/* Rest of your JSX code... */}
            {popular && popular.length > 0 && pathname === "/movie/upcoming" && (
        <div className={styles.TitleContainer}>
          <div className={styles.TitleContent}>
            <h1 className={styles.Title}>평점높은 영화</h1>
            <p className={styles.SubTitle}>
            모든 영화 중에서 평점이 높은 영화 목록을 가져옵니다.
              <br />
              평점이 높은 영화를 기준으로 정렬합니다.
            </p>
          </div>
        </div>
      )}

<div className={styles.ButtonContainer}>
  <div className={styles.ButtonContent}>
    <a href="/movie" className={`${styles.ButtonLink} ${pathname === '/movie' ? styles.current : ''}`}>
      인기 영화
    </a>
    <a
      href="/movie/now-playing"
      className={`${styles.ButtonLink} ${pathname === '/movie/now-playing' ? styles.current : ''}`}
    >
      현재 상영중
    </a>
    <a
      href="/movie/upcoming"
      className={`${styles.ButtonLink} ${pathname === '/movie/upcoming' ? styles.current : ''}`}
    >
      상영 예정
    </a>
    <a
      href="/movie/top-rated"
      className={`${styles.ButtonLink} ${pathname === '/movie/top-rated' ? styles.current : ''}`}
    >
      평점높은 영화
    </a>
  </div>
</div>

{popular && popular.length > 0 && pathname === "/movie" && (
        <Section title="인기 영화">
          {popular.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              imageurl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date ? movie.release_date : ""}
              isMovie={true}
              overview={movie.overview}
              popularity={movie.popularity && Math.round(movie.popularity)}
            ></Poster>
          ))}
        </Section>
      )}

{popularInfinite && popularInfinite.length > 0 && pathname === "/movie" && (
        <Section title="인기 영화">
          {popularMovies.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              imageurl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date ? movie.release_date : ""}
              isMovie={true}
              overview={movie.overview}
              popularity={movie.popularity && Math.round(movie.popularity)}
            ></Poster>
          ))}
        </Section>
      )}

      {nowPlaying && nowPlaying.length > 0 && pathname === "/movie/now-playing" && (
        <Section title="현재 상영중">
          {nowPlaying.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              imageurl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date ? movie.release_date : ""}
              isMovie={true}
              overview={movie.overview}
              popularity={movie.popularity && Math.round(movie.popularity)}
            ></Poster>
          ))}
        </Section>
      )}

      {nowPlayingInfinite && nowPlayingInfinite.length > 0 && pathname === "/movie/now-playing" && (
        <Section title="현재 상영중">
          {nowPlayingMovies.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              imageurl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date ? movie.release_date : ""}
              isMovie={true}
              overview={movie.overview}
              popularity={movie.popularity && Math.round(movie.popularity)}
            ></Poster>
          ))}
        </Section>
      )}

      {upcoming && upcoming.length > 0 && pathname === "/movie/upcoming" && (
        <Section title="상영 예정">
          {upcoming.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              imageurl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date ? movie.release_date : ""}
              isMovie={true}
              overview={movie.overview}
              popularity={movie.popularity && Math.round(movie.popularity)}
            ></Poster>
          ))}
        </Section>
      )}

      {upcomingInfinite && upcomingInfinite.length > 0 && pathname === "/movie/upcoming" && (
        <Section title="상영 예정">
          {upcomingMovies.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              imageurl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date ? movie.release_date : ""}
              isMovie={true}
              overview={movie.overview}
              popularity={movie.popularity && Math.round(movie.popularity)}
            ></Poster>
          ))}
        </Section>
      )}

      {topRated && topRated.length > 0 && pathname === "/movie/top-rated" && (
        <Section title="평점높은 영화">
          {topRated.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              imageurl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date ? movie.release_date : ""}
              isMovie={true}
              overview={movie.overview}
              popularity={movie.popularity && Math.round(movie.popularity)}
            ></Poster>
          ))}
        </Section>
      )}

      {topRatedInfinite && topRatedInfinite.length > 0 && pathname === "/movie/top-rated" && (
        <Section title="평점높은 영화">
          {topRatedMovies.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              imageurl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date ? movie.release_date : ""}
              isMovie={true}
              overview={movie.overview}
              popularity={movie.popularity && Math.round(movie.popularity)}
            ></Poster>
          ))}
        </Section>
      )}
  <button className={styles.GototopButton} onClick={() => window.scrollTo(0, 0)} >
    <FontAwesomeIcon icon={faArrowUp} style={{ color: "white", fontSize: "25px" }} />
  </button>


</div>
      )

}

export default MoviePresenter;