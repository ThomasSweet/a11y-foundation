import { createSSRApp, type Component } from 'vue'
import { renderToString } from 'vue/server-renderer'

import HubView from '../site/HubView/HubView.vue'
import StandardPage from '../pages/StandardPage.vue'
import CraftPage from '../pages/CraftPage.vue'
import ShowcasePage from '../pages/ShowcasePage.vue'
import ProofPage from '../pages/ProofPage.vue'
import GlossaryView from '../site/GlossaryView/GlossaryView.vue'
import AgentSkillView from '../site/AgentSkillView/AgentSkillView.vue'
import ScreenReaderView from '../site/ScreenReaderView/ScreenReaderView.vue'
import DevToolsView from '../site/DevToolsView/DevToolsView.vue'
import AuditRoomView from '../site/AuditRoomView/AuditRoomView.vue'

export const views: Record<string, Component> = {
  index: HubView,
  standard: StandardPage,
  craft: CraftPage,
  showcase: ShowcasePage,
  proof: ProofPage,
  glossary: GlossaryView,
  'agent-skill': AgentSkillView,
  'screen-reader': ScreenReaderView,
  devtools: DevToolsView,
  'audit-room': AuditRoomView,
}

export function render(name: string) {
  const view = views[name]
  if (!view) throw new Error(`prerender: no view for "${name}"`)
  return renderToString(createSSRApp(view))
}
