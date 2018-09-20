<script>
import Menu, {SubMenu, MenuItem, Divider} from '../supply/assembly/vc-menu'
import '../supply/assembly/vc-menu/assets/index.styl'

function handleSelect(info) {
  console.log('selected ', info);
}

function handleClick(info) {
  console.log('click ', info);
}


export default {
  render() {
    return (
     <div style={{
       width: '150px'
     }}>
      <Menu
      onSelect={handleSelect}
      defaultActiveFirst
      onClick={handleClick}
    >
      <SubMenu title={(<span>sub menu</span>)} key="1">
        <MenuItem key="1-1">0-1</MenuItem>
        <MenuItem key="1-2">0-2</MenuItem>
      </SubMenu>
      <MenuItem>
        <a href="http://taobao.com" target="_blank">i do not need key</a>
      </MenuItem>
      <MenuItem key="3">outer</MenuItem>
      <SubMenu title={(<span>sub menu</span>)} key="4">
        <MenuItem key="4-1">inner inner</MenuItem>
        <Divider />
        <SubMenu
          key="4-2"
          title={(<span>sub menu</span>)}
        >
          <MenuItem key="4-2-1">inn</MenuItem>
          <SubMenu title={(<span>sub menu</span>)} key="4-2-2">
            <MenuItem key="4-2-2-1">inner inner</MenuItem>
            <MenuItem key="4-2-2-2">inner inner2</MenuItem>
          </SubMenu>
        </SubMenu>
      </SubMenu>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem key="4-3">outer3</MenuItem>
    </Menu>
     </div>
    )
  }
}

</script>