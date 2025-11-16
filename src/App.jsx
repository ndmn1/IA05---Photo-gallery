import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PhotoListPage from "./pages/PhotoList";
import PhotoDetailPage from "./pages/PhotoDetail";
import { PATHS } from "./constants/paths";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path={PATHS.HOME}
          element={<Navigate to={PATHS.PHOTOS} replace />}
        />
        <Route path={PATHS.PHOTOS} element={<PhotoListPage />} />
        <Route path={PATHS.PHOTO_DETAIL} element={<PhotoDetailPage />} />
        <Route path="*" element={<Navigate to={PATHS.PHOTOS} replace />} />
      </Routes>
    </Router>
  );
}
