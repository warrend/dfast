export const SUBMISSION_STATUSES = {
  unsent: {
    key: 'unsent',
    label: 'Unsent',
  },
  sent: {
    key: 'sent',
    label: 'Unsent',
  },
  rejected: {
    key: 'rejected',
    label: 'Rejected',
  },
  accepted: {
    key: 'accepted',
    label: 'Accepted',
  },
} as const;

export const PITCH_STATUSES = {
  ...SUBMISSION_STATUSES,
  accepted: {
    key: 'accepted',
    label: 'Accepted',
    statuses: {
      working: {
        key: 'accepted-working',
        label: 'Working',
      },
      draftSent: {
        key: 'accepted-draft-sent',
        label: 'Draft sent',
      },
      draftAccepted: {
        key: 'accepted-draft-accepted',
        label: 'Draft accepted',
      },
    },
  },
} as const;
