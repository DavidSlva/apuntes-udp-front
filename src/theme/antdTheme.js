import { primaryColor, dangerColor } from './colors';

const { ConfigProvider } = require('antd');
// import esES from 'antd/es/locale/es_ES';

const whitTheme = (node) => (
  <>
    <ConfigProvider
      //   locale={esES}
      theme={{
        // algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: dangerColor,
        },
        components: {
          Layout: {
            headerBg: 'transparent',
            triggerBg: dangerColor,
            siderBg: '#fff',
            headerPadding: '0',
          },
          Menu: {
            itemColor: dangerColor,
            itemBorderRadius: '0.375rem',
          },
          Button: {
            dangerColor: dangerColor,
            borderRadius: '0.375rem',
          },
          Input: {
            borderRadius: '0.375rem',
          },
          InputNumber: {
            borderRadius: '0.375rem',
          },
          Select: {
            borderRadius: '0.375rem',
          },
          DatePicker: {
            borderRadius: '0.375rem',
          },
        },
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 16,
          },
        }}
      >
        {node}
      </ConfigProvider>
    </ConfigProvider>
  </>
);

export default whitTheme;
