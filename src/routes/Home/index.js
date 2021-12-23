import React from "react";

import IntlMessages from "util/IntlMessages";

const Home = () => {
  return (
    <div>
      <h2 className="title gx-mb-4"><IntlMessages id="sidebar.samplePage"/></h2>

      <div className="gx-d-flex justify-content-center">
        <h4>Start building your app. Happy Coding!</h4>
      </div>

    </div>
  );
};

export default Home;
