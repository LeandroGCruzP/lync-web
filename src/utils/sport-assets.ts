import { SportName } from '~/interfaces/event-interfaces'

const PREFIX = '/images/events'

export const SPORT_IMAGES_PATHS: Record<SportName, string> = {
  [SportName.BASKETBALL]: `${PREFIX}/basketball.jpg`,
  [SportName.RUNNING]: `${PREFIX}/running.jpg`,
  [SportName.SOCCER]: `${PREFIX}/soccer.jpg`,
  [SportName.SWIMMING]: `${PREFIX}/swimming.jpg`,
}
