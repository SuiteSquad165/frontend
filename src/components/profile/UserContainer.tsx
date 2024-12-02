
import { Table, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../shadcn-ui/table";
import ProfileInfoBox from "./ProfileInfoBox";

export default function UserContainer () {
    return (
        <>
            <ProfileInfoBox label="User Information" buttonLabel="Edit" content={
                <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">
                        <button className="bg-[#00B4D8] text-white rounded-md w-1/2 h-full hover:bg-[#2292c2]">Edit</button>  
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableFooter>
                  <TableRow>
                    <TableCell>this is</TableCell>
                    <TableCell>something</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableFooter>
              </Table>}/>
            <ProfileInfoBox label="Rewards" buttonLabel="Redeem" content={
                <Table className="w-1/2">
                <TableHeader>
                  <TableRow>
                    <TableHead>Points Earned</TableHead>
                  </TableRow>
                </TableHeader>
                <TableFooter>
                  <TableRow>
                    <TableCell>1000 pts</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableFooter>
              </Table>}/>
        </>
    );
}