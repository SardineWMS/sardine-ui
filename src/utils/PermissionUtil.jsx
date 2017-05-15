export default function PermissionUtil(permissionCode) {
    var permissions = eval('(' + localStorage.getItem("ownedResources") + ')');

    for(let i=0;i<permissions.length;i++){
    	if(permissions[i].code == permissionCode)
    		return true;
    }
    return false;
}