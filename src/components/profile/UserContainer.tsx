"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "@/store/slices/authSlice";
import {
  Table,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../shadcn-ui/table";
import ProfileInfoBox from "./ProfileInfoBox";
import { fetchUserInfo } from "@/utils/actions"; // Adjust import path as needed

const UserContainer = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserInfo(); // Fetch user data
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading user information...</p>;
  }

  if (!user) {
    return <p>No user information available.</p>;
  }

  return (
    <>
      {/* User Information Section */}
      <ProfileInfoBox
        label="User Information"
        buttonLabel="Edit"
        content={
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableFooter>
              <TableRow>
                <TableCell>{user.firstName || "N/A"}</TableCell>
                <TableCell>{user.lastName || "N/A"}</TableCell>
                <TableCell>{user.email || "N/A"}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        }
      />

      {/* Rewards Section */}
      <ProfileInfoBox
        label="Rewards"
        buttonLabel="Redeem"
        content={
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reward Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableFooter>
              <TableRow>
                <TableCell>{user.rewardPoints || 0} pts</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        }
      />
    </>
  );
};

export default UserContainer;
