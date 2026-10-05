import { requireAuth } from "@/lib/data/session"
import { requireActiveProject } from "@/lib/data/project"

export type AuthContext = {
  session: Awaited<ReturnType<typeof requireAuth>>
}

export type ProjectActionContext = AuthContext & {
  activeProject: Awaited<ReturnType<typeof requireActiveProject>>
}

export function authAction<Args extends unknown[], Return>(
  action: (ctx: AuthContext, ...args: Args) => Promise<Return>
) {
  return async (...args: Args): Promise<Return> => {
    const session = await requireAuth()
    return action({ session }, ...args)
  }
}

export function projectAction<Args extends unknown[], Return>(
  action: (ctx: ProjectActionContext, ...args: Args) => Promise<Return>
) {
  return async (...args: Args): Promise<Return> => {
    const session = await requireAuth()
    const activeProject = await requireActiveProject(session.userId)
    return action({ session, activeProject }, ...args)
  }
}
