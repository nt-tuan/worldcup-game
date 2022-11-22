import { Container, Space, Modal, Button, Divider, Flex } from "@mantine/core";

import BetOptions from "../components/BetOptions";
import DealInfo from "../components/DealInfo";
import request from "../utils/request";

import { useQuery, useMutation } from "react-query";
import { useState } from "react";
import { BetList } from "../components/BetList";
import { useInvalidateBets } from "../components/invalidate";
import { useIsAuthenticated } from "@azure/msal-react";
import { UserProfile } from "../components/UserProfile";
import { useAuth } from "../components/useAuth";
import { Login } from "../components/Login";
import { BetRate } from "../components/BetRate";

function HomeContent() {
  const invalidate = useInvalidateBets();
  const [betsOpened, setBetsOpened] = useState(false);
  const [opened, setOpened] = useState(false);
  const { isLoading, data: dealInfo } = useQuery(["deals"], async () =>
    request.getAPI("/highlight-deal")
  );
  const dealId = dealInfo?.id;
  const { data } = useQuery(
    ["deals", "bet"],
    async () => request.getAPI(`/deal/${dealId}/bet`),
    { enabled: dealId != null, refetchInterval: 10 }
  );

  const { mutate, isLoading: isUpdating } = useMutation(
    async ({ amount, optionId }) =>
      request.postAPI(`/deal/${dealId}/bet`, {
        dealID: dealId,
        dealOptionID: optionId,
        amount,
      }),
    {
      onSuccess: () => {
        invalidate();
        setBetsOpened(true);
        setOpened(true);
      },
    }
  );
  return (
    <Container>
      <BetRate bets={data} />
      <BetOptions
        isLoading={isLoading}
        isUpdating={isUpdating}
        data={dealInfo?.options}
        bets={data}
        onPlaceBet={mutate}
      />
      <Space h="xl" />
      <DealInfo data={dealInfo} />
      <Divider my="xl" />
      {data && data.length > 0 && (
        <BetList
          data={data}
          open={betsOpened}
          onToggle={() => setBetsOpened((item) => !item)}
          dealId={dealInfo?.id}
          options={dealInfo?.options}
        />
      )}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Đặt lệnh thành công"
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
      >
        <Button onClick={() => setOpened(false)}>Ah, ok</Button>
      </Modal>
    </Container>
  );
}

function Home() {
  const isAuthenticated = useIsAuthenticated();
  const { isLoggedIn, logout } = useAuth();

  if (!isLoggedIn() || !isAuthenticated)
    return (
      <Flex h={500} align="center" justify="center" justifyContent="center">
        <Login />
      </Flex>
    );
  return (
    <Container>
      <Flex
        mx={20}
        mt={20}
        direction="row"
        gap="sm"
        justify="space-between"
        align="center"
      >
        <UserProfile />
        <Button variant="subtle" onClick={logout}>
          Logout
        </Button>
      </Flex>
      <Space h="xl" />
      <HomeContent />
    </Container>
  );
}
export default Home;
