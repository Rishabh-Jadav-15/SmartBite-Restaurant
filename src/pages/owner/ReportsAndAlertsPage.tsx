import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { GlassCard } from '../../components/common/GlassCard';
import { formatINR } from '../../utils/formatters';
import {
  FileText,
  Download,
  Printer,
  AlertTriangle,
  CheckCircle2,
  Bell,
  Sparkles,
  Calendar,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  ShieldAlert,
  Zap,
  Info,
  Clock,
  ChevronRight,
} from 'lucide-react';
import {
  SAMPLE_BUSINESS_REPORTS,
  BUSINESS_ALERTS_DATA,
} from '../../data/dummyData';
import { BusinessReport, BusinessAlert } from '../../types';

export const ReportsAndAlertsPage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const { isDarkMode } = useTheme();
  const [selectedReportPeriod, setSelectedReportPeriod] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY'>('MONTHLY');
  const [reports, setReports] = useState<BusinessReport[]>(SAMPLE_BUSINESS_REPORTS);
  const [activeReport, setActiveReport] = useState<BusinessReport>(SAMPLE_BUSINESS_REPORTS[0]);
  const [alerts, setAlerts] = useState<BusinessAlert[]>(BUSINESS_ALERTS_DATA);
  const [alertSeverityFilter, setAlertSeverityFilter] = useState<'ALL' | 'CRITICAL' | 'WARNING' | 'OPPORTUNITY' | 'INFO'>('ALL');
  const [isGeneratingNewReport, setIsGeneratingNewReport] = useState<boolean>(false);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  const filteredAlerts = alerts.filter((a) => {
    if (alertSeverityFilter === 'ALL') return true;
    return a.severity === alertSeverityFilter;
  });

  const handleResolveAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: a.status === 'ACTIVE' ? 'RESOLVED' : 'ACTIVE' } : a))
    );
  };

  const handleGenerateReport = () => {
    setIsGeneratingNewReport(true);
    setTimeout(() => {
      const newReport: BusinessReport = {
        id: `rep-${Date.now()}`,
        title: `${selectedReportPeriod.charAt(0) + selectedReportPeriod.slice(1).toLowerCase()} Executive Performance Audit`,
        period: selectedReportPeriod,
        dateRange: selectedReportPeriod === 'DAILY' ? 'Today (29 Aug 2026)' : 'Current Cycle Rolling',
        generatedAt: 'Just now',
        totalRevenue: 3740000,
        netProfit: 1220000,
        ebitdaMargin: 32.6,
        orderCount: 5000,
        avgOrderValue: 748,
        totalCustomers: 3760,
        newCustomers: 890,
        returningCustomerRate: 76.3,
        tableUtilization: 86.4,
        topSellingDish: 'Foxtail Millet & Moong Dal Khichdi Bowl',
        topCategory: 'Healthy Bowls',
        lowPerformingDish: 'Organic Brown Rice Vegan Biryani',
        executiveSummary: `Generated comprehensive ${selectedReportPeriod} financial and operational performance dossier. Revenue tracking at +22.4% with solid 32.6% EBITDA margins.`,
        keyActionItems: [
          'Continue scaling millet supply chain directly with farmer networks.',
          'Optimize dinner peak capacity via rooftop seating expansion.',
        ],
      };
      setReports([newReport, ...reports]);
      setActiveReport(newReport);
      setIsGeneratingNewReport(false);
    }, 1000);
  };

  const handleDownloadPDF = () => {
    setDownloadSuccessMessage('PDF Report dossier rendered and downloaded successfully.');
    window.print();
    setTimeout(() => {
      setDownloadSuccessMessage(null);
    }, 4000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Feature #15, #16 & #20 • Executive Reporting & Alert Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Executive Reports & Business Alerts</h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Generate audit-ready daily, weekly, monthly, quarterly & yearly PDF reports, alongside real-time business health alerts.
          </p>
        </div>

        {downloadSuccessMessage && (
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{downloadSuccessMessage}</span>
          </div>
        )}
      </div>

      {/* Feature #20: Real-Time Business Alerts Command Bar */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#FF6B35]" />
              <span>Real-Time Business Alerts & Opportunities (Feature #20)</span>
            </h2>
            <p className="text-xs text-gray-400">
              Autonomous monitoring flags low inventory thresholds, underperforming dishes, margin spikes, and weekend demand surges.
            </p>
          </div>

          {/* Alert Severity Filter */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-black/20 border border-white/10">
            {(['ALL', 'CRITICAL', 'WARNING', 'OPPORTUNITY'] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setAlertSeverityFilter(sev)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  alertSeverityFilter === sev
                    ? 'bg-[#FF6B35] text-white shadow'
                    : isDarkMode
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredAlerts.map((alert) => {
            const isCritical = alert.severity === 'CRITICAL';
            const isOpportunity = alert.severity === 'OPPORTUNITY';
            const isResolved = alert.status === 'RESOLVED';

            return (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                  isResolved
                    ? 'opacity-60 bg-white/5 border-white/5'
                    : isCritical
                    ? isDarkMode
                      ? 'bg-red-500/10 border-red-500/30'
                      : 'bg-red-50 border-red-200'
                    : isOpportunity
                    ? isDarkMode
                      ? 'bg-purple-500/10 border-purple-500/30'
                      : 'bg-purple-50 border-purple-200'
                    : isDarkMode
                    ? 'bg-amber-500/10 border-amber-500/30'
                    : 'bg-amber-50 border-amber-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-xl mt-0.5 ${
                      isCritical
                        ? 'bg-red-500/20 text-red-400'
                        : isOpportunity
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {isCritical ? (
                      <ShieldAlert className="w-4 h-4" />
                    ) : isOpportunity ? (
                      <Zap className="w-4 h-4" />
                    ) : (
                      <AlertTriangle className="w-4 h-4" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white">{alert.title}</span>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          isCritical
                            ? 'bg-red-500 text-white'
                            : isOpportunity
                            ? 'bg-purple-500 text-white'
                            : 'bg-amber-500 text-black'
                        }`}
                      >
                        {alert.severity}
                      </span>
                      <span className="text-[10px] text-gray-400">{alert.timestamp}</span>
                    </div>
                    <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">{alert.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => navigate(alert.actionPath)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{alert.actionLabel}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleResolveAlert(alert.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      isResolved
                        ? 'bg-gray-500/20 text-gray-400'
                        : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                    }`}
                  >
                    {isResolved ? 'Mark Active' : 'Resolve'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Feature #15: Report Generation Control Panel */}
      <GlassCard className="p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              <span>Executive Business Report Generator (Feature #15)</span>
            </h2>
            <p className="text-xs text-gray-400">
              Select reporting timeframe to compile real-time financial matrices, operational KPIs, and executive summaries.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-black/20 border border-white/10">
              {(['DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedReportPeriod(period)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                    selectedReportPeriod === period
                      ? 'bg-cyan-500 text-black shadow'
                      : isDarkMode
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {period.toLowerCase()}
                </button>
              ))}
            </div>

            <button
              onClick={handleGenerateReport}
              disabled={isGeneratingNewReport}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold rounded-xl shadow-lg flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Sparkles className={`w-4 h-4 ${isGeneratingNewReport ? 'animate-spin' : ''}`} />
              <span>{isGeneratingNewReport ? 'Synthesizing Data...' : 'Generate New Report'}</span>
            </button>
          </div>
        </div>

        {/* Available Generated Reports Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {reports.map((rep) => (
            <button
              key={rep.id}
              onClick={() => setActiveReport(rep)}
              className={`p-3 rounded-xl border text-left min-w-[220px] transition-all cursor-pointer ${
                activeReport.id === rep.id
                  ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-400 shadow-md'
                  : isDarkMode
                  ? 'bg-[#242424] border-white/10 text-gray-400 hover:text-white'
                  : 'bg-gray-50 border-black/10 text-gray-600 hover:text-black'
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider block text-cyan-400">
                {rep.period} REPORT
              </span>
              <p className="text-xs font-bold truncate text-white mt-0.5">{rep.title}</p>
              <p className="text-[10px] text-gray-400 mt-1">{rep.dateRange}</p>
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Feature #16: Printable / PDF Downloadable Executive Report Card */}
      <GlassCard className="p-8 space-y-6 print:bg-white print:text-black print:shadow-none border-cyan-500/30">
        {/* Printable Report Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-inherit">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FF6B35] text-white">
                SMARTBITE AI RESTAURANT SUITE
              </span>
              <span className="text-xs font-mono text-gray-400">Confidential Audit</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">{activeReport.title}</h2>
            <p className="text-xs text-gray-400">
              Audit Window: <span className="font-bold text-white">{activeReport.dateRange}</span> • Generated:{' '}
              {activeReport.generatedAt}
            </p>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Dossier (Feature #16)</span>
            </button>
            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl border border-white/10 hover:bg-white/5 transition-colors"
              title="Print directly"
            >
              <Printer className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Executive Summary Narrative */}
        <div className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">1. Executive Overview</h4>
          <p className="text-xs text-gray-200 leading-relaxed">{activeReport.executiveSummary}</p>
        </div>

        {/* Financial & Operational KPI Table */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">2. Key Financial & Operational Metrics</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[11px] text-gray-400">Gross Total Revenue</span>
              <p className="text-lg font-black text-cyan-400 mt-1">{formatINR(activeReport.totalRevenue)}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[11px] text-gray-400">Net Operating Profit</span>
              <p className="text-lg font-black text-emerald-400 mt-1">{formatINR(activeReport.netProfit)}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[11px] text-gray-400">EBITDA Margin %</span>
              <p className="text-lg font-black text-purple-400 mt-1">{activeReport.ebitdaMargin}%</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[11px] text-gray-400">Orders Fulfilled</span>
              <p className="text-lg font-black text-[#FF6B35] mt-1">{activeReport.orderCount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Customer & Menu Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">3. Patron & Table Performance</h4>
            <div className="text-xs space-y-1.5 p-3.5 rounded-xl bg-white/5 border border-white/5">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Active Customers:</span>
                <span className="font-bold text-white">{activeReport.totalCustomers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">New Diner Acquisition:</span>
                <span className="font-bold text-cyan-400">+{activeReport.newCustomers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Repeat Retention Rate:</span>
                <span className="font-bold text-emerald-400">{activeReport.returningCustomerRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Table Occupancy Velocity:</span>
                <span className="font-bold text-purple-400">{activeReport.tableUtilization}%</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">4. Menu & Category Champions</h4>
            <div className="text-xs space-y-1.5 p-3.5 rounded-xl bg-white/5 border border-white/5">
              <div className="flex justify-between">
                <span className="text-gray-400">Star Best Seller:</span>
                <span className="font-bold text-emerald-400 truncate max-w-[200px]">{activeReport.topSellingDish}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Dominant Category:</span>
                <span className="font-bold text-[#FF6B35]">{activeReport.topCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Low-Performing Item:</span>
                <span className="font-bold text-amber-400 truncate max-w-[200px]">{activeReport.lowPerformingDish}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Average Order Value:</span>
                <span className="font-bold text-white font-mono">{formatINR(activeReport.avgOrderValue)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Action Items */}
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400">5. Strategic Executive Action Directives</h4>
          <div className="space-y-2">
            {activeReport.keyActionItems.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sign-off footer */}
        <div className="pt-6 border-t border-inherit flex items-center justify-between text-[11px] text-gray-500 font-mono">
          <span>SmartBite AI v2.4 • Business Intelligence Engine</span>
          <span>Verified by Owner & General Manager</span>
        </div>
      </GlassCard>
    </div>
  );
};
