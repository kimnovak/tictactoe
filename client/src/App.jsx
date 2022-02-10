import Layout from '@common/Layout';
import Lobby from '@components/Lobby';
import { RoomContextProvider } from '@context/RoomContext';
import Board from './components/Board';
import { GameContextProvider } from './context/GameContext';

function App() {
  return (
    <Layout>
      <GameContextProvider>
        <RoomContextProvider>
          <Lobby />
          <Board />
        </RoomContextProvider>
      </GameContextProvider>
    </Layout>
  );
}

export default App;
