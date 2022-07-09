import 'custom.scss';

import React, { PureComponent } from 'react';

import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { Button, stylesFactory, Themeable, withTheme } from '@grafana/ui';
import DataGrid from 'devextreme-react/data-grid';
import { columns, service } from 'data';

interface Props extends Themeable, PanelProps<SimpleOptions> {}
interface State {
  // eslint-disable-next-line
  dataSource: any;
}

class CustomSimplePanel extends PureComponent<Props, State> {
  useForceUpdate = async () => {
    let data = await service.getData();
    this.setState({ dataSource: data });
  };

  render() {
    //const { options, data, width, height, theme } = this.props;

    const { options, data, width, height, theme } = this.props;
    //const theme = options.t
    const styles = getStyles();

    let ds = this.state?.dataSource || [];

    let color: string;

    switch (options.color) {
      case 'red':
        color = theme.palette.redBase;
        break;
      case 'green':
        color = theme.palette.greenBase;
        break;
      case 'blue':
        color = theme.palette.blue95;
        break;
    }
    return (
      <div className={'box'}>
        <div>
          <svg height="100" width="100">
            <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="3" fill={color} />
          </svg>
        </div>
        <pre>{JSON.stringify(ds)}</pre>

        <Button variant={'primary'} size={'md'} key={'md'} onClick={this.useForceUpdate}>
          Get Data
        </Button>

        <DataGrid dataSource={ds} defaultColumns={columns} showBorders={true} />
      </div>
    );
  }
}

export const SimplePanel = withTheme(CustomSimplePanel);

// export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
//   // 每次 refresh panel 都會進入

//   const theme = useTheme();
//   const styles = getStyles();

//   let color: string;

//   switch (options.color) {
//     case 'red':
//       color = theme.palette.redBase;
//       break;
//     case 'green':
//       color = theme.palette.greenBase;
//       break;
//     case 'blue':
//       color = theme.palette.blue95;
//       break;
//   }

//   //create your forceUpdate hook
//   function useForceUpdate() {
//     service.getData();
//   }

//   return (
//     <div className={'box'}>
//       <div>
//         <svg height="100" width="100">
//           <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="3" fill={color} />
//         </svg>
//       </div>
//       <pre>{JSON.stringify(mydata)}</pre>

//       <Button variant={'primary'} size={'md'} key={'md'} onClick={useForceUpdate}>
//         Get Data
//       </Button>

//       <DataGrid dataSource={mydata} defaultColumns={columns} showBorders={true} />
//     </div>

//     // <div
//     //   className={cx(
//     //     styles.wrapper,
//     //     css`
//     //       width: ${width}px;
//     //       height: ${height}px;
//     //     `
//     //   )}
//     // >
//     //   <svg
//     //     className={styles.svg}
//     //     width={width}
//     //     height={height}
//     //     xmlns="http://www.w3.org/2000/svg"
//     //     xmlnsXlink="http://www.w3.org/1999/xlink"
//     //     viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
//     //   >
//     //     <g>
//     //       <circle style={{ fill: `${theme.isLight ? theme.palette.greenBase : theme.palette.blue95}` }} r={100} />
//     //     </g>
//     //   </svg>

//     //   <div className={styles.textBox}>
//     //     {options.showSeriesCount && (
//     //       <div
//     //         className={css`
//     //           font-size: ${theme.typography.size[options.seriesCountSize]};
//     //         `}
//     //       >
//     //         Number of series: {data.series.length}
//     //       </div>
//     //     )}
//     //     <div>Text option value: {options.text}</div>
//     //   </div>
//     // </div>
//   );
// };

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
      over
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});
