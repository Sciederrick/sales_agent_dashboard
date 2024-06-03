import { Route, Routes } from "react-router-dom";

import NotFound from "./pages/NotFound";
import Overview from "./pages/Overview";
import SchoolManagement from "./pages/SchoolManagement";

const App = () => {
  return (
      <>
          <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/manage" element={<SchoolManagement />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
      </>
  );
};

export default App;
