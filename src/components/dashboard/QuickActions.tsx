import { useNavigate } from 'react-router-dom';
import { useLocale } from '../../context/LocaleContext';
import { paths } from '../../router/Paths';
import {
  GroupIcon,
  ChatIcon,
  MailIcon,
  ListIcon,
  PlusIcon,
  CalenderIcon,
  DollarLineIcon,
  DocsIcon,
  BoxCubeIcon,
  PageIcon,
  TaskIcon,
  UserCircleIcon,
} from '../../icons';

interface QuickAction {
  key: string;
  labelKey: string;
  icon: any;
  path: string;
  pinned?: boolean;
}

interface QuickActionGroup {
  key: string;
  titleKey: string;
  accent: string;
  actions: QuickAction[];
}

const groups: QuickActionGroup[] = [
  {
    key: 'applicants',
    titleKey: 'qaGroupApplicants',
    accent: '#e42e2b',
    actions: [
      { key: 'viewApplicants', labelKey: 'qaViewApplicants', icon: GroupIcon, path: paths.applicants.root, pinned: true },
      { key: 'quickSearch', labelKey: 'qaQuickSearch', icon: ChatIcon, path: paths.applicants.blueCaller },
      { key: 'mailPreview', labelKey: 'qaMailPreview', icon: MailIcon, path: paths.applicants.mailPreview },
      { key: 'savedFields', labelKey: 'qaSavedFields', icon: ListIcon, path: paths.recruiting.savedFields },
    ],
  },
  {
    key: 'jobs',
    titleKey: 'qaGroupJobs',
    accent: '#f59e0b',
    actions: [
      { key: 'createJob', labelKey: 'qaCreateJob', icon: PlusIcon, path: paths.jobs.create, pinned: true },
      { key: 'calendar', labelKey: 'qaCalendar', icon: CalenderIcon, path: paths.misc.calendar },
      { key: 'jobOffers', labelKey: 'qaJobOffers', icon: DollarLineIcon, path: paths.jobs.offers },
      { key: 'jobContracts', labelKey: 'qaJobContracts', icon: DocsIcon, path: paths.jobs.contracts },
    ],
  },
  {
    key: 'companies',
    titleKey: 'qaGroupCompanies',
    accent: '#0ea5e9',
    actions: [
      { key: 'companies', labelKey: 'qaCompanies', icon: BoxCubeIcon, path: paths.companies.root, pinned: true },
      { key: 'companySettings', labelKey: 'qaCompanySettings', icon: PageIcon, path: paths.recruiting.companySettings },
      { key: 'interviewSettings', labelKey: 'qaInterviewSettings', icon: TaskIcon, path: paths.recruiting.interviewSettings },
      { key: 'users', labelKey: 'qaUsers', icon: UserCircleIcon, path: paths.admin.users },
    ],
  },
];

export default function QuickActions() {
  const navigate = useNavigate();
  const { t } = useLocale();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <h2 className="mb-4 text-base font-semibold text-gray-800 dark:text-white/90">
        {t('quickActionsTitle', 'home')}
      </h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {groups.map((group, gIdx) => (
          <div key={group.key}>
            <div className="mb-2 flex items-center gap-2">
              <span
                className="size-1.5 rounded-full"
                style={{ backgroundColor: group.accent }}
              />
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {t(group.titleKey, 'home')}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {group.actions.map((action, aIdx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.key}
                    type="button"
                    onClick={() => navigate(action.path)}
                    style={{ animationDelay: `${(gIdx * 4 + aIdx) * 30}ms` }}
                    className={`animate-fade-slide-in relative flex flex-col items-start gap-2 rounded-xl border p-3 text-start transition-all hover:-translate-y-0.5 hover:shadow-md ${
                      action.pinned
                        ? 'border-brand-200 bg-brand-50/60 dark:border-brand-900/40 dark:bg-brand-500/10'
                        : 'border-gray-200 bg-gray-50 hover:bg-white dark:border-gray-800 dark:bg-white/[0.02] dark:hover:bg-white/[0.05]'
                    }`}
                  >
                    {action.pinned && (
                      <span className="absolute -top-2 end-2 rounded-full bg-brand-500 px-1.5 py-0.5 text-[9px] font-semibold leading-none text-white shadow-sm">
                        {t('mostUsed', 'home')}
                      </span>
                    )}
                    <span
                      className="flex size-8 items-center justify-center rounded-lg"
                      style={{ backgroundColor: group.accent + '1a', color: group.accent }}
                    >
                      <Icon className="size-4" />
                    </span>
                    <span className="text-xs font-medium leading-tight text-gray-700 dark:text-gray-300">
                      {t(action.labelKey, 'home')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
