import { Outlet } from "react-router-dom";
import Navigation from "../../components/navigation/navigation.component";
import "./app.layout.scss";
import { ConfirmationDialog } from "../../components/dialogs/confirmation-dialog.component";

export default function App() {
  return (
    <main>
      <ConfirmationDialog />
      <Navigation />
      <section id="container">
        <Outlet />
      </section>
    </main>
  );
}
