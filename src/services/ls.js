export default {
  get(key) {
    return localStorage.getItem(key) ? localStorage.getItem(key) : null
  },

  set(key, val) {
    localStorage.setItem(key, val)
  },

  remove(key) {
    localStorage.removeItem(key)
  },
  permissions(){
    const userPermissions = JSON.parse(this.get('permissions') || "[]");
    return userPermissions;
  },
  hasPermission(permission){
    return this.permissions().includes(permission)
  }
}
