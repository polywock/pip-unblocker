import 'regenerator-runtime/runtime'
import { WebRequestManager } from './WebRequestManager'

declare global {
  interface Window {
    mgr: WebRequestManager
  }
}
window.mgr = new WebRequestManager()



