import Layout from '@common/Layout';
import Lobby from '@components/Lobby';
import { RoomContextProvider } from '@context/RoomContext';

function App() {
  return (
    <Layout>
      <RoomContextProvider>
        <Lobby />
      </RoomContextProvider>
    </Layout>
  );
}

export default App;
