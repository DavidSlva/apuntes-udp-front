import { primaryColor } from './colors';

const { ConfigProvider } = require('antd');
// import esES from 'antd/es/locale/es_ES';

const whitTheme = (node) => (
  <>
    <ConfigProvider
      //   locale={esES}
      theme={{
        // algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: primaryColor,
        },
        components: {
          Layout: {
            headerBg: '#fff',
            triggerBg: primaryColor,
            siderBg: '#fff',
          },
          Menu: {
            itemColor: primaryColor,
            itemBorderRadius: '0.375rem',
          },
          Button: {
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
