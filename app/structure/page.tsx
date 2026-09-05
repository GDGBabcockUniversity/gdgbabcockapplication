"use client";

import { useState } from "react";

const structure = {
  name: "Organizer / President",
  tier: 1,
  children: [
    {
      name: "Vice-President",
      tier: 2,
      children: [
        {
          name: "General Secretary",
          tier: 3,
          children: [
            { name: "Deputy General Secretary", tier: "deputy" },
          ]
        },
        {
          name: "Programs Lead",
          tier: 3,
          children: [
            { name: "Deputy Programs Lead", tier: "deputy" },
            {
              name: "Programs Team",
              tier: "extended",
              isExtended: true,
              children: [
                { name: "ORBIT", tier: "program" },
                { name: "GDG Week", tier: "program" },
                { name: "Build with AI", tier: "program" },
                { name: "DevFest", tier: "program" },
              ]
            },
          ]
        },
        {
          name: "Community Lead",
          tier: 3,
          children: [
            { name: "Deputy Community Lead", tier: "deputy" },
            {
              name: "Community Team",
              tier: "extended",
              isExtended: true,
              children: [
                { name: "Monthly Meetup", tier: "program" },
                { name: "Game Nights", tier: "program" },
                { name: "Twitter Spaces", tier: "program" },
                { name: "Member Welfare", tier: "program" },
              ]
            },
          ]
        },
        {
          name: "Marketing Lead",
          tier: 3,
          children: [
            { name: "Deputy Marketing Lead", tier: "deputy" },
            {
              name: "Marketing Team",
              tier: "extended",
              isExtended: true,
              children: [
                { name: "Campaigns", tier: "program" },
                { name: "Social Media", tier: "program" },
                { name: "GDG Wrapped", tier: "program" },
              ]
            },
          ]
        },
        {
          name: "Partnerships Lead",
          tier: 3,
          children: [
            { name: "Deputy Partnerships Lead", tier: "deputy" },
            {
              name: "Partnerships Team",
              tier: "extended",
              isExtended: true,
              children: [
                { name: "Corporate Sponsors", tier: "program" },
                { name: "Institutional Partners", tier: "program" },
                { name: "Alumni Network", tier: "program" },
              ]
            },
          ]
        },
        {
          name: "Media Lead",
          tier: 3,
          children: [
            { name: "Deputy Media Lead", tier: "deputy" },
            { name: "Ship It", tier: "program" },
            { name: "Obsessed", tier: "program" },
            { name: "Intersection", tier: "program" },
            {
              name: "RADAR Team Lead",
              tier: "extended",
              isExtended: true,
              children: [
                { name: "RADAR Publication", tier: "program" },
                { name: "Editorial Standards", tier: "program" },
              ]
            },
            {
              name: "Babcock 100 Editorial",
              tier: "extended",
              isExtended: true,
              children: [
                { name: "Review Committee", tier: "program" },
                { name: "Profile Collection", tier: "program" },
                { name: "Archive Management", tier: "program" },
              ]
            },
          ]
        },
        {
          name: "TL: Development",
          tier: 3,
          children: [
            { name: "Deputy TL Development", tier: "deputy" },
            {
              name: "Dev Team",
              tier: "extended",
              isExtended: true,
              children: [
                { name: "GDG Site", tier: "program" },
                { name: "BabcockVotes", tier: "program" },
                { name: "Apply Portal", tier: "program" },
                { name: "RADAR Site", tier: "program" },
                { name: "Babcock 100 Site", tier: "program" },
                { name: "StudySmart", tier: "program" },
              ]
            }
          ]
        },
        {
          name: "TL: Tracks",
          tier: 3,
          children: [
            { name: "Deputy TL Tracks", tier: "deputy" },
            {
              name: "Learning Team",
              tier: "extended",
              isExtended: true,
              children: [
                {
                  name: "Software Dev Track",
                  tier: "extended",
                  isExtended: true,
                  children: [
                    { name: "Open Source Projects", tier: "program" },
                    { name: "Weekly Dev Sessions", tier: "program" },
                    { name: "Hackathon Prep", tier: "program" },
                  ]
                },
                {
                  name: "Data & AI Track",
                  tier: "extended",
                  isExtended: true,
                  children: [
                    { name: "Chatbothon", tier: "program" },
                    { name: "AI Study Groups", tier: "program" },
                    { name: "ML Projects", tier: "program" },
                  ]
                },
                {
                  name: "Infra & Security Track",
                  tier: "extended",
                  isExtended: true,
                  children: [
                    { name: "CTF Sessions", tier: "program" },
                    { name: "Cloud Labs", tier: "program" },
                    { name: "Security Workshops", tier: "program" },
                  ]
                },
                {
                  name: "Design & Management Track",
                  tier: "extended",
                  isExtended: true,
                  children: [
                    { name: "Design Critiques", tier: "program" },
                    { name: "Portfolio Reviews", tier: "program" },
                    { name: "PM Workshops", tier: "program" },
                  ]
                },
              ]
            },
          ]
        },
      ]
    }
  ]
};

const tierStyles: Record<string, any> = {
  1:        { className: "bg-foreground text-background font-bold border-2 border-foreground", padding: "10px 18px", fontSize: 14 },
  2:        { className: "bg-background text-foreground font-semibold border-2 border-foreground", padding: "8px 14px", fontSize: 13 },
  3:        { className: "bg-secondary text-foreground font-semibold border border-border", padding: "7px 13px", fontSize: 12 },
  deputy:   { className: "bg-transparent text-[var(--google-green)] font-medium border border-dashed border-[var(--google-green)]", padding: "4px 10px", fontSize: 10 },
  extended: { className: "bg-card text-[var(--google-blue)] font-medium border border-dashed border-[var(--google-blue)] opacity-90", padding: "6px 12px", fontSize: 11 },
  program:  { className: "bg-transparent text-muted-foreground font-medium border border-border", padding: "4px 10px", fontSize: 10 },
};

function Node({ node, depth = 0, forceOpen }: { node: any; depth?: number; forceOpen?: boolean }) {
  const [open, setOpen] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;
  const style = tierStyles[node.tier] || tierStyles.program;
  const isEffectivelyOpen = forceOpen !== undefined ? forceOpen : open;
  const isExtendedHeader = node.isExtended;
  const isDeputy = node.tier === "deputy";
  
  // Connectors logic based on the style
  const connectorColor = isExtendedHeader ? "var(--google-blue)" : isDeputy ? "var(--google-green)" : "var(--border)";
  const connectorDash = isExtendedHeader || isDeputy ? "dashed" : "solid";

  return (
    <div style={{ marginLeft: depth * 18, marginBottom: isDeputy ? 2 : 3 }}>
      {isExtendedHeader && (
        <div className="text-[10px] text-[var(--google-blue)] tracking-[0.12em] uppercase mb-[3px] ml-[2px] opacity-70">
          extended
        </div>
      )}
      {isDeputy && (
        <div className="text-[10px] text-[var(--google-green)] tracking-[0.12em] uppercase mb-[3px] ml-[2px] opacity-80">
          deputy
        </div>
      )}
      <div
        onClick={() => hasChildren && forceOpen === undefined && setOpen(!open)}
        className={`inline-flex items-center gap-2 rounded-md ${style.className} transition-opacity duration-150 select-none ${hasChildren ? "cursor-pointer" : "cursor-default"}`}
        style={{ padding: style.padding, fontSize: style.fontSize }}
      >
        {hasChildren && (
          <span 
            className="inline-block opacity-50 transition-transform duration-200"
            style={{ fontSize: 8, transform: isEffectivelyOpen ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            ▶
          </span>
        )}
        {node.name}
        {node.sub && <span className="font-normal opacity-60 text-[10px]">· {node.sub}</span>}
      </div>

      {hasChildren && isEffectivelyOpen && (
        <div style={{
          marginTop: 4,
          borderLeft: `1.5px ${connectorDash} ${connectorColor}`,
          marginLeft: 14,
          paddingLeft: 10,
          paddingTop: 2,
        }} className="opacity-80">
          {node.children.map((child: any, i: number) => (
            <Node key={i} node={child} depth={depth + 1} forceOpen={forceOpen} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrganogramPage() {
  const [expandAll, setExpandAll] = useState<boolean | undefined>(undefined);

  return (
    <div className="min-h-screen bg-background p-10 md:p-14 font-sans animate-fade-in-up">
      
      <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            GDG on Campus Babcock
          </h1>
          <div className="text-muted-foreground text-xs mt-2 tracking-widest uppercase font-medium">
            Leadership Structure · 2026 / 2027
          </div>
        </div>
        <div className="flex gap-2">
          {[
            { label: "Expand all", value: true },
            { label: "Collapse all", value: false },
            { label: "Reset", value: undefined },
          ].map((btn) => (
            <button
              key={btn.label}
              onClick={() => setExpandAll(btn.value as any)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium tracking-wide transition-all border ${
                expandAll === btn.value
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="text-muted-foreground text-[10px] tracking-widest uppercase mb-2 font-semibold">
          Advisory Layer: Non-hierarchical
        </div>
        <div className="flex gap-3 flex-wrap items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--google-yellow)] text-[var(--foreground)] rounded-md text-xs font-bold border border-[var(--google-yellow)]">
            Dr. Ernest Onuiri
            <span className="font-normal text-[10px] opacity-80">· Campus Adviser & Institutional Sponsor</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-card text-[var(--google-yellow)] rounded-md text-xs font-bold border border-[var(--google-yellow)]">
            Alumni Advisory Council
            <span className="font-normal text-[10px] opacity-80">Art. VIII · Schedule E</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 ml-1">
          <div className="w-7 h-[1px] bg-[var(--google-yellow)] opacity-50" />
          <span className="text-muted-foreground text-[10px] tracking-wide">advisory relationship ↕, no operational control</span>
        </div>
      </div>

      <div className="w-[1px] h-4 bg-border ml-3 mb-1" />

      <div className="overflow-x-auto pb-8">
        <Node node={structure} depth={0} forceOpen={expandAll} />
      </div>

      <div className="mt-12 pt-6 border-t border-border flex gap-4 flex-wrap items-center">
        <span className="text-foreground text-[10px] tracking-widest uppercase font-bold mr-2">Legend</span>
        {[
          { colorClass: "bg-foreground border-foreground text-background", label: "Organizer" },
          { colorClass: "bg-background border-foreground text-foreground border-2", label: "Vice-President" },
          { colorClass: "bg-secondary border-border text-foreground border", label: "Core Executive" },
          { colorClass: "bg-transparent border-[var(--google-green)] text-[var(--google-green)] border-dashed border", label: "Deputy" },
          { colorClass: "bg-card border-[var(--google-blue)] text-[var(--google-blue)] border-dashed border", label: "Extended Leadership" },
          { colorClass: "bg-transparent border-border text-muted-foreground border", label: "Programs / Products" },
          { colorClass: "bg-[var(--google-yellow)] text-foreground", label: "Faculty Advisor" },
        ].map((l, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-sm ${l.colorClass}`} />
            <span className="text-muted-foreground text-xs font-medium">{l.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 text-muted-foreground text-[10px] tracking-wide">
        Click any node to expand or collapse · Use controls above to expand or collapse all
      </div>
    </div>
  );
}