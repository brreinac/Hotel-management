type RoomTypeCode = 'EST' | 'JUN' | 'SUI'
export function filterAccommodations(
  accommodations: { id: number; code: string; name: string }[],
  typeCode: RoomTypeCode
) {
  const mapping: Record<RoomTypeCode, string[]> = {
    EST: ['SEN', 'DOB'],
    JUN: ['TRI', 'CUA'],
    SUI: ['SEN', 'DOB', 'TRI'],
  }
  return accommodations.filter(a => mapping[typeCode].includes(a.code))
}
