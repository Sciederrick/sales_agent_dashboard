import { Route, Routes } from "react-router-dom";

import NotFound from "./pages/NotFound";
import Overview from "./pages/Overview";
import ViewSchools from "./pages/SchoolManagement/ViewSchools";
import SchoolDetails from "./pages/SchoolManagement/SchoolDetails";

const App = () => {
  return (
      <>
          <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/schools" element={<ViewSchools />} />
              <Route path="/schools/:id/:section" element={<SchoolDetails />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
      </>
  );
};

export default App;
