import React from "react";
import { Scroller } from "@/components/common";
import {
  AccountCard,
  AccountItemsWrapper,
  UserCard,
} from "@/components/modules/application";
import { accountStyles } from "@/styles";
import useTransition from "@/hooks/useTransition";

const AccountScreen = () => {
  const { onMessages, onMyList } = useTransition();
  return (
    <Scroller>
      <AccountItemsWrapper style={[accountStyles.con, accountStyles.spaceTop]}>
        <UserCard
          avatarImage=""
          name="Daniel Honma"
          description={"danielhonma@gmail.com"}
          onPress={() => {}}
        />
      </AccountItemsWrapper>

      <AccountItemsWrapper style={[accountStyles.con, accountStyles.spaceTop]}>
        <AccountCard icon="list" title="My Listings" onPress={onMyList} />
        <AccountCard icon="mail" title="My Messages" onPress={onMessages} />
      </AccountItemsWrapper>
      <AccountItemsWrapper style={[accountStyles.con, accountStyles.spaceTop]}>
        <AccountCard icon="log-out" title="Log Out" onPress={() => {}} />
      </AccountItemsWrapper>
    </Scroller>
  );
};

export default AccountScreen;
