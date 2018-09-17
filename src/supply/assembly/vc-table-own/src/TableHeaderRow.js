import PropTypes from '@util/vue-types'

const TableHeaderRow = {
  name: 'TableHeaderRow',
  props: {
      index: PropTypes.number,
      columns: PropTypes.array,
      rows: PropTypes.array,
      row: PropTypes.array,
      components: PropTypes.object
  },
  render(h) {
      const { index, columns, row, components } = this
      const HeaderRow = components.header.row
      const HeaderCell = components.header.cell

      return (
          <HeaderRow>
              {
                  row.map((cell, i) => {
                      const { children } = cell
                      return (
                          <HeaderCell>
                            {children}
                          </HeaderCell>
                      )
                  })
              }
          </HeaderRow>
      )
  }
}

export default TableHeaderRow