import { useRequest } from "ahooks";
import { Col, Layout, Row, theme, Breadcrumb, Input, Rate } from "antd";
import { useMemo, useState } from "react";
import SearchModule from "./SearchModule";

interface Props {
  onChange?: (params: EagleUse.SearchParams) => void;
  count?: number;
  params?: EagleUse.SearchParams;
}

const JustifyLayoutSearch = (props: Props) => {
  const { token } = theme.useToken();

  const params = useMemo(() => props?.params, [props.params]);
  const [tempParams, setTempParams] = useState<{
    annotation: string;
  }>({
    annotation: undefined,
  });

  const onChange = ({
    orderBy,
    tags,
    size,
    annotation,
    ext,
    star,
  }: EagleUse.SearchParams) => {
    props?.onChange({
      ...params,
      tags,
      size,
      orderBy,
      annotation,
      ext,
      star,
    });
  };

  const tempChange = (key: string) => {
    return new Promise((resolve) => {
      props.onChange({
        ...params,
        [key]: tempParams[key],
      });
      resolve(true);
    });
  };

  const { run } = useRequest(tempChange, {
    debounceWait: 1000,
  });

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
              <SearchModule.Size
                onChange={(e) =>
                  onChange({
                    ...params,
                    size: e,
                  })
                }
              />
            </Col>
            <Col>
              <Input
                size="small"
                style={{ width: 120 }}
                placeholder="注释"
                allowClear
                value={tempParams.annotation}
                onChange={(e) => {
                  setTempParams({ ...tempParams, annotation: e.target.value });

                  tempParams.annotation = e.target.value;
                  tempParams.annotation
                    ? run("annotation")
                    : tempChange("annotation");
                }}
              />
            </Col>
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
              <SearchModule.Ext
                value={params.ext}
                onChange={(e) => {
                  onChange({
                    ...params,
                    ext: e,
                  });
                }}
              />
            </Col>

            <Col>
              <Rate
                style={{ fontSize: 16 }}
                value={params.star}
                onChange={(e) => {
                  onChange({
                    ...params,
                    star: e,
                  });
                }}
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
