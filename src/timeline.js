/*
 * One vertical scroll timeline drives the site.
 *
 *   0            WIPE_VH        STAGE_VH                     end of document
 *   |--- wipe ----|--- hold -----|--- normal vertical sections ---|
 *   p: 0 -------> 1
 *
 * After the stage releases, sections scroll like any normal page. Each one gets
 * its own --s (progress through the viewport, 0 when centred) so its layers can
 * move at different rates.
 */

export const WIPE_VH = 1       // page 1 -> page 2
export const DWELL_VH = 1.2    // page 2 holds before the document carries on
export const STAGE_VH = WIPE_VH + DWELL_VH
