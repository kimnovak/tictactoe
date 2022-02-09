import Layout from '@common/Layout';
import Lobby from '@components/Lobby';
import { RoomContextProvider } from '@context/RoomContext';
import Board from './components/Board';

function App() {
  return (
    <Layout>
      <RoomContextProvider>
        <Lobby />
        <Board />
      </RoomContextProvider>
    </Layout>
  );
}

export default App;
