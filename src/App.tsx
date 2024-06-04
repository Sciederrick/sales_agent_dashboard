import { Route, Routes } from "react-router-dom";

import NotFound from "./pages/NotFound";
import Overview from "./pages/Overview";
import ViewSchools from "./pages/SchoolManagement/ViewSchools";
import SchoolInvoices from "./pages/SchoolManagement/SchoolInvoices";
import SchoolCollections from "./pages/SchoolManagement/SchoolCollections";

const App = () => {
  return (
      <>
          <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/schools" element={<ViewSchools />} />
              <Route path="/schools/:id/invoices" element={<SchoolInvoices />} />
              <Route path="/schools/:id/collections" element={<SchoolCollections />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
      </>
  );
};

export default App;
