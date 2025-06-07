import React from "react";
import { Scroller } from "@/components/common";
import {
  AccountCard,
  AccountItemsWrapper,
  UserCard,
} from "@/components/modules/application";
import { accountStyles } from "@/styles";
import useTransition from "@/hooks/useTransition";
import { useAuthCtx } from "@/context/auth";

const AccountScreen = () => {
  const { onMessages, onMyList } = useTransition();
  const { logout, user } = useAuthCtx()
  return (
    <Scroller>
      <AccountItemsWrapper style={[accountStyles.con, accountStyles.spaceTop]}>
        <UserCard
          avatarImage=""
          name={user.name}
          description={user.email}
          onPress={() => { }}
        />
      </AccountItemsWrapper>

      <AccountItemsWrapper style={[accountStyles.con, accountStyles.spaceTop]}>
        <AccountCard icon="list" title="My Listings" onPress={onMyList} />
        <AccountCard icon="mail" title="My Messages" onPress={onMessages} />
      </AccountItemsWrapper>
      <AccountItemsWrapper style={[accountStyles.con, accountStyles.spaceTop]}>
        <AccountCard icon="log-out" title="Log Out" onPress={logout} />
      </AccountItemsWrapper>
    </Scroller>
  );
};

export default AccountScreen;
