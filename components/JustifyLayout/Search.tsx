import { Col, Layout, Row, theme, Breadcrumb } from "antd";
import { useMemo } from "react";
import SearchModule from "./SearchModule";

interface Props {
  onChange?: (params: EagleUse.SearchParams) => void;
  count?: number;
  params?: EagleUse.SearchParams;
}

const JustifyLayoutSearch = (props: Props) => {
  const { token } = theme.useToken();

  const params = useMemo(() => props?.params, [props.params]);

  const onChange = ({ orderBy, tags, size }: EagleUse.SearchParams) => {
    console.log(orderBy);
    props?.onChange({
      ...params,
      tags,
      size,
      orderBy,
    });
  };

  return (
    <Layout.Header
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: token.colorBgLayout,
        zIndex: token.zIndexPopupBase,
        padding: "0 20px",
        height: 72,
        lineHeight: "36px",
      }}
    >
      <Row style={{ height: 36 }}>
        <Col style={{ display: "flex", alignItems: "center" }}>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>全部</Breadcrumb.Item>
            <Breadcrumb.Item>搜索结果({props.count})</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row style={{ height: 36 }}>
        <Col flex={1}>
          <Row gutter={[10, 10]}>
            <Col>
              <SearchModule.Tag
                value={params.tags}
                onChange={(e) => {
                  onChange({
                    ...params,
                    tags: e,
                  });
                }}
              />
            </Col>

            <Col>
              <SearchModule.Size
                onChange={(e) =>
                  onChange({
                    ...params,
                    size: e,
                  })
                }
              />
            </Col>
          </Row>
        </Col>

        <Col>
          <Row gutter={[10, 10]}>
            <Col>
              <SearchModule.SortRule
                onChange={(e) => {
                  onChange({
                    ...params,
                    orderBy: e,
                  });
                }}
              />
            </Col>
            <Col>
              <SearchModule.Sort
                onChange={(e) => {
                  onChange({
                    ...params,
                    orderBy: e,
                  });
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default JustifyLayoutSearch;
