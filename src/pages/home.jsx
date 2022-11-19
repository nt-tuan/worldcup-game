import { Container, Space } from "@mantine/core";

import BetOptions from "../components/BetOptions";
import DealInfo from "../components/DealInfo";
import request from "../utils/request";
import { useMemo } from "react";
import { useQuery } from "react-query";

const status = {
  ACTIVE: "ACTIVE",
};

function Home() {
  const { isLoading, data } = useQuery(["deals"], async () =>
    request.getAPI(
      "https://run.mocky.io/v3/0b5f78e3-6266-40a3-95f5-5ab4aa587abd"
    )
  );

  const dealInfo = useMemo(() => {
    if (data?.length > 0) {
      const activeDeal = data.find((d) => d.status === status.ACTIVE);
      return activeDeal;
    }
    return null;
  }, [data]);

  return (
    <Container>
      <DealInfo data={dealInfo} />
      <Space h="xl" />
      <BetOptions isLoading={isLoading} data={dealInfo?.options} />
    </Container>
  );
}

export default Home;
