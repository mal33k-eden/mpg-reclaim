import React, { useContext, useEffect, useState } from "react";
import ClaimedCard from "./components/ClaimedCard";

import ShowInfo from "./components/ShowInfo";
import InvestorContext from "./context/user";

import SanityContext from "./context/sanityDB";
import UnregisteredView from "./views/UnregisteredView";
import RegisteredView from "./views/RegisteredView";
import { Button } from "react-bootstrap";

function App() {
  const { isAuthenticated, refactoredAddress, claimedProfile, connectedAddress } = useContext(InvestorContext);
  const { getDBInvestor, setcompletedWizard, completedWizard } = useContext(SanityContext);
  const [dbuser, setdbuser] = useState(null);
  const [refreshState, setrefreshState] = useState(false);
  useEffect(() => {
    if (isAuthenticated) {
      if (connectedAddress != null || connectedAddress !== "undefined") {
        initialiseApp(connectedAddress);
      }
    } else {
      setdbuser(null);
    }
  }, [isAuthenticated, refreshState, completedWizard]);

  const initialiseApp = async (_address) => {
    let _dbUser = await getDBInvestor(_address);
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
