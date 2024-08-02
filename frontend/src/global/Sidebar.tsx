import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  PlusCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  HomeIcon,
  InformationCircleIcon,
  UsersIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import useAuth from "../contexts/AuthContext";

export default function Sidebar() {
  const { signOut, userRole } = useAuth();
  return (
    <Card className="h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 ">
      <div className="mb-2 p-4">
        <Typography variant="h3" className="text-[#171717]">
          GPT Compare
        </Typography>
      </div>
      <List>
        <Link to="/home" className="no-underline text-[#171717]">
          <ListItem>
            <ListItemPrefix>
              <HomeIcon className="h-5 w-5" />
            </ListItemPrefix>
            Home
          </ListItem>
        </Link>
        {(userRole === "user" || userRole === "admin") && (
          <>
            <Link to="/home/history" className="no-underline text-[#171717]">
              <ListItem>
                <ListItemPrefix>
                  <Bars3Icon className="h-5 w-5" />
                </ListItemPrefix>
                History
              </ListItem>
            </Link>
            <Link
              to="/home/account-settings"
              className="no-underline text-[#171717]"
            >
              <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Account
              </ListItem>
            </Link>
          </>
        )}

        <Link to="/home/help-page" className="no-underline text-[#171717]">
          <ListItem>
            <ListItemPrefix>
              <InformationCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Help
          </ListItem>
        </Link>
        {userRole !== "user" && userRole !== "admin" && (
          <Link to="/sign-up" className="no-underline text-[#171717]">
            <ListItem>
              <ListItemPrefix>
                <PlusCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Create Account
            </ListItem>
          </Link>
        )}
        {userRole === "admin" && (
          <>
            <Link
              to="/home/admin-settings"
              className="no-underline text-[#171717]"
            >
              <ListItem>
                <ListItemPrefix>
                  <Cog6ToothIcon className="h-5 w-5" />
                </ListItemPrefix>
                Configuration
              </ListItem>
            </Link>
            <Link to="/home/users" className="no-underline text-[#171717]">
              <ListItem>
                <ListItemPrefix>
                  <UsersIcon className="h-5 w-5" />
                </ListItemPrefix>
                Users
              </ListItem>
            </Link>
          </>
        )}
        {(userRole === "user" || userRole === "admin") && (
          <Link
            to="/"
            onClick={signOut}
            className="no-underline text-[#171717]"
          >
            <ListItem>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </Link>
        )}
      </List>
    </Card>
  );
}
