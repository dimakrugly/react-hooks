import React, {Component, useEffect, useState, useCallback, useMemo} from "react";
import ReactDOM from "react-dom/client";
import {prettyDOM} from "@testing-library/react";

const App = () => {
    const [value, setValue] = useState(1);
    const [visible, setVisible] = useState(true);

    if (visible) {
        return (
            <div>
                <button onClick={()=> setValue((v) => v + 1)}>+</button>
                <button onClick={()=> setVisible(false)}>hide</button>
                {/*<ClassCounter value={value}/>*/}
                {/*<HookCounter value={value}/>*/}
                {/*<Notification/>*/}
                <PlanetInfo id={value }/>
            </div>
        );
    } else {
        return <button onClick={()=> setVisible(true)}>Show</button>
    }
}
const getPlanet = (id) => {
    return fetch(`https://swapi.dev/api/planets/${id}`)
        .then(res=>res.json())
        .then(data=> data);
};

const useRequest = (request) => {
const initialState =  useMemo(()=>(
    {
        data: null,
        loading: true,
        error: null
    }
), [])

    const [dataState, setDataState] = useState(initialState);

    useEffect(()=>{
        setDataState(initialState)
        let cancelled = false;
    request()
            .then(data=> !cancelled && setDataState({
                data,
                loading: false,
                error: null
            }))
        .catch(error => !cancelled && setDataState({
            data: null,
            loading: false,
            error
        }));
        return () => cancelled = true;
    }, [request])

    return dataState;
}


const usePlanetInfo = (id) => {
    const request = useCallback(()=> getPlanet(id), [id])

 return useRequest(request);
}

const PlanetInfo = ({id}) => {
  const {data, loading, error} = usePlanetInfo(id);
  if (error) {
      return <div>Smthng went wrong</div>
  }
  if (loading) {
      return <div>loading</div>
  }

    return (
        <div>{id} - {data.name}</div>
    )
}
const HookCounter = ({ value }) => {
    useEffect(()=>{
        console.log('update');
        return  ()=> console.log('unmount')
        }, [value])

    return <p>{value}</p>
};


const Notification = () => {
  const [vis, setVis] = useState(true);

  useEffect(()=>{
     const timeout =  setTimeout(() => setVis(false), 1500);
     return ()=> clearTimeout(timeout)
  }, [])

    return (<div>
        { vis && <p>Hello</p>}
    </div>)
}
class ClassCounter extends Component {
    componentDidMount() {
        console.log('class: mount')
    };

    componentDidUpdate(props) {
        console.log('class: update')
    };

    componentWillUnmount() {
        console.log('class: unmount')
    };

    render() {
        return <p>{this.props.value}</p>
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App/>
);

