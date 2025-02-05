/* eslint-disable */
import * as VTable from '../../src';
import VChart from '@visactor/vchart';
import { bindDebugTool } from '../../src/scenegraph/debug-tool';
const CONTAINER_ID = 'vTable';
VTable.register.chartModule('vchart', VChart);
export function createTable() {
  fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/VTable/North_American_Superstore_Pivot_Chart_data.json')
    .then(res => res.json())
    .then(data => {
      // data=data.splice(0,260);
      const columns = [
        {
          dimensionKey: 'Region',
          title: 'Region',
          headerStyle: {
            textStick: true
          }
        },
        'Category'
      ];
      const rows = [
        {
          dimensionKey: 'Order Year',
          title: 'Order Year',
          headerStyle: {
            textStick: true
          }
        },
        'Ship Mode'
      ];
      const indicators = [
        {
          indicatorKey: 'Quantity',
          title: 'Quantity',
          cellType: 'chart',
          chartModule: 'vchart',
          chartSpec: {
            type: 'radar',
            categoryField: 'Segment',
            seriesField: 'Sub-Category',
            valueField: 'Quantity',
            data: {
              id: 'baseData'
            }
          },
          style: {
            padding: 1
          }
        }
      ];
      const option = {
        hideIndicatorName: true,
        rows,
        columns,
        indicators,
        records: data,
        defaultRowHeight: 200,
        defaultHeaderRowHeight: 50,
        defaultColWidth: 280,
        defaultHeaderColWidth: 100,
        indicatorTitle: '指标',
        autoWrapText: true,
        // widthMode: 'adaptive',
        // heightMode: 'adaptive',
        corner: {
          titleOnDimension: 'row',
          headerStyle: {
            autoWrapText: true
          }
        },

        pagination: {
          currentPage: 0,
          perPageCount: 8
        }
      };
      const tableInstance = new VTable.PivotChart(document.getElementById(CONTAINER_ID), option);
      tableInstance.onVChartEvent('click', args => {
        console.log('onVChartEvent click', args);
      });
      tableInstance.onVChartEvent('mouseover', args => {
        console.log('onVChartEvent mouseover', args);
      });
      window.tableInstance = tableInstance;

      bindDebugTool(tableInstance.scenegraph.stage, { customGrapicKeys: ['col', 'row'] });

      window.update = () => {
        theme.cornerLeftBottomCellStyle.borderColor = 'red';
        tableInstance.updateTheme(theme);
      };
    });
}
