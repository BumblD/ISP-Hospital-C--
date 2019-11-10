// @flow

import * as React from "react";

import { Page, Form } from "tabler-react";

import SiteWrapper from "./SiteWrapper.react";

function Home() {
  return (
    <SiteWrapper>
      <Page.Content>
      <br></br>
        <center>
          <div style={{fontSize: "3rem"}}>
            Sveiki atvykę į C-- ligoninės tinklapį
          </div>
        </center>
        <br></br>
      </Page.Content>
    </SiteWrapper>
  );
}

export default Home;
