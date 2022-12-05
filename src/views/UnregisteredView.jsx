import React, { useEffect } from "react";
import ClaimedCard from "../components/ClaimedCard";

import GetIdoClaimed from "../components/GetIdoClaimed";
import GetSeedClaimed from "../components/GetSeedClaimed";
import RegisterClaimed from "../components/RegisterClaimed";
import ShowInfo from "../components/ShowInfo";
const UnregisteredView = ({ _dbUser }) => {
  useEffect(() => {
    console.log(_dbUser);
  }, [_dbUser]);
  return (
    <div>
      <ShowInfo
        title={"Attention!"}
        variant={"warning"}
        message={
          "By clicking the confirm button you agree that the statistics of your token claims stated below are correct and you have confirmed same!"
        }
      />
      <GetIdoClaimed address={_dbUser["address"]} />
      <GetSeedClaimed address={_dbUser["address"]} />
      <RegisterClaimed address={_dbUser["address"]} />
    </div>
  );
};

export default UnregisteredView;
