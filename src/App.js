import { useState, useEffect, useContext } from "react";
import { ethers, providers } from "ethers";
import ShowInfo from "./components/ShowInfo";
import UnregisteredView from "./views/UnregisteredView";
import RegisteredView from "./views/RegisteredView";
import { Button } from "react-bootstrap";
import SanityContext from "./context/sanityDB";
import InvestorContext from "./context/user";
function App() {
  const { isAuthenticated, refactoredAddress, connectedAddress } = useContext(InvestorContext);
  const { getDBInvestor, setcompletedWizard, completedWizard } = useContext(SanityContext);
  const [web3Modal, setWeb3Modal] = useState(null);
  const [dbuser, setdbuser] = useState(null);
  const [refreshState, setrefreshState] = useState(false);
  const [web3Pvdr, setWeb3Pvdr] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      if (connectedAddress != null) {
        initialiseApp(connectedAddress);
      }
    } else {
      setdbuser(null);
    }
    console.log("v2");
  }, [isAuthenticated, refreshState, completedWizard]);

  const initialiseApp = async (_address) => {
    let _dbUser = await getDBInvestor(_address);
    console.log(_dbUser);
    setdbuser(_dbUser);
  };
  const refresher = () => {
    setrefreshState(!refreshState);
  };

  return (
    <div className="App">
      {isAuthenticated && <ShowInfo title={"Connected Address"} variant={"success"} message={refactoredAddress} action={refresher} />}
      {isAuthenticated && dbuser == null && (
        <Button onClick={refresher} variant="success" size="sm">
          Refresh State
        </Button>
      )}
      {dbuser ? (
        dbuser["is_registered"] ? (
          <RegisteredView _dbUser={dbuser} />
        ) : (
          <UnregisteredView _dbUser={dbuser} />
        )
      ) : (
        <ShowInfo title={"Attention!"} variant={"warning"} message={"Kindly connect your wallet to begin."} />
      )}
    </div>
  );
}

export default App;
