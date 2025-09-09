import { SidebarComponent } from "@syncfusion/ej2-react-navigations" ;
import { MobileSidebar, NavItems } from "components";
import { Outlet, redirect } from "react-router";
import { getExistingUser, storeUserData } from "~/apppwrite/auth";
import { account } from "~/apppwrite/client";

export async function clientLoader() {
  try {
      const user = await account.get();

      if(!user.$id) return redirect('/sign-in');

      const exisitingUser = await getExistingUser(user.$id);

      if(exisitingUser?.status === 'user'){
        return redirect('/');
      }
      return exisitingUser?.$id ? exisitingUser : await storeUserData();
      
  } catch (e) {
      console.log('Error in ClientLoader',e);

      return redirect('/sign-in');
  }
}

const adminLayout = () => {
  return (
    <div className="admin-layout">
      <MobileSidebar/>
      <aside className="w-full max-w-[270px] hidden lg:block">
        <SidebarComponent width={270} enableGestures={false}>
         <NavItems />
        </SidebarComponent>
      </aside>
      <aside className="children">
        <Outlet/>
      </aside>
    </div>
  )
}

export default adminLayout