/// <reference types="react" />
import './App.scss';
declare type AppPropsType = {
    serverApi: string | null;
};
declare const App: ({ serverApi }: AppPropsType) => JSX.Element;
export default App;
