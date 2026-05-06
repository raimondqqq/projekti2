"use client"

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { ImageUpload } from "./ImageUpload"
import { Loader2Icon } from "lucide-react"
import { parseJsonFieldAsString } from '@/lib/json-utils'
import { LAYOUT_VARIANT_DESCRIPTIONS, LAYOUT_VARIANTS, DEVICE_TYPES, IMAGE_FOLDERS, ASPECT_RATIOS } from '@/lib/constants'
import { Project } from '@/types'
import { useAdminForm } from '@/hooks/useAdminForm'

const projectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  client: z.string().min(1, "Client is required"),
  summary: z.string().optional(),
  startYear: z.string().regex(/^\d{4}$/, "Start year must be 4 digits"),
  endYear: z.string().optional(),
  services: z.string(),
  industry: z.string(),
  website: z.string().optional(),
  heroImage: z.string().min(1, "Hero image is required"),
  deviceMockup: z.string().min(1, "Device mockup is required"),
  deviceType: z.enum(["laptop", "mobile"]),
  layoutVariant: z.enum(["A", "B", "C", "D", "E", "F"]),
  caseStudy: z.string().optional(),
  caseStudySlug: z.string().optional(),
  comingSoon: z.boolean(),
})

type ProjectFormData = z.infer<typeof projectSchema>

interface ProjectFormProps {
  project?: Project
  mode: "create" | "edit"
}

export function ProjectForm({ project, mode }: ProjectFormProps) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project?.name || "",
      client: project?.client || "",
      summary: project?.summary || "",
      startYear: project?.startYear?.toString() || new Date().getFullYear().toString(),
      endYear: project?.endYear?.toString() || "",
      services: parseJsonFieldAsString(project?.services),
      industry: parseJsonFieldAsString(project?.industry),
      website: project?.website || "",
      heroImage: project?.heroImage || "",
      deviceMockup: project?.deviceMockup || "",
      deviceType: (project?.deviceType || "laptop") as "laptop" | "mobile",
      layoutVariant: (project?.layoutVariant || "A") as "A" | "B" | "C" | "D" | "E" | "F",
      caseStudy: project?.caseStudy || "",
      caseStudySlug: project?.caseStudySlug || "",
      comingSoon: project?.comingSoon ?? true,
    },
  })

  const heroImage = watch("heroImage")
  const deviceMockup = watch("deviceMockup")
  const deviceType = watch("deviceType")
  const layoutVariant = watch("layoutVariant")
  const comingSoon = watch("comingSoon")

  const { isSubmitting, onSubmit } = useAdminForm<ProjectFormData>({
    endpoint: '/api/admin/projects',
    itemId: project?.id,
    mode,
    transformData: (data) => ({
      ...data,
      services: data.services.split(",").map((s) => s.trim()).filter(Boolean),
      industry: data.industry.split(",").map((i) => i.trim()).filter(Boolean),
      summary: data.summary || null,
      startYear: parseInt(data.startYear),
      endYear: data.endYear ? parseInt(data.endYear) : null,
      website: data.website || null,
      caseStudy: data.caseStudy || null,
      caseStudySlug: data.caseStudySlug || null,
    }),
    redirectTo: '/admin/projects',
    successMessage: mode === "create" ? "Project created" : "Project updated",
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
        <div className="grid gap-6">
          <div>
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="e.g., Dashboard Redesign"
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="client">Client</Label>
            <Input
              id="client"
              {...register("client")}
              placeholder="e.g., Acme Corp"
            />
            {errors.client && (
              <p className="text-sm text-destructive mt-1">
                {errors.client.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="summary">Project Summary</Label>
            <Textarea
              id="summary"
              {...register("summary")}
              placeholder="Short description shown on hover..."
              rows={3}
            />
            {errors.summary && (
              <p className="text-sm text-destructive mt-1">
                {errors.summary.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startYear">Start Year</Label>
              <Input
                id="startYear"
                {...register("startYear")}
                placeholder="2024"
                maxLength={4}
              />
              {errors.startYear && (
                <p className="text-sm text-destructive mt-1">
                  {errors.startYear.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="endYear">End Year (optional, leave empty if ongoing)</Label>
              <Input
                id="endYear"
                {...register("endYear")}
                placeholder="2025"
                maxLength={4}
              />
              {errors.endYear && (
                <p className="text-sm text-destructive mt-1">
                  {errors.endYear.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="services">Services (comma-separated)</Label>
            <Input
              id="services"
              {...register("services")}
              placeholder="e.g., UX Design, UI Design, Prototyping"
            />
          </div>

          <div>
            <Label htmlFor="industry">Industry (comma-separated)</Label>
            <Input
              id="industry"
              {...register("industry")}
              placeholder="e.g., FinTech, SaaS"
            />
          </div>

          <div>
            <Label htmlFor="website">Website (optional)</Label>
            <Input
              id="website"
              {...register("website")}
              placeholder="e.g., example.com or https://example.com"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Project website URL - will be displayed as &quot;See Live&quot; in case study
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Media</h2>
        <div className="grid gap-6">
          <ImageUpload
            label="Hero Image"
            value={heroImage}
            onChange={(url) => setValue("heroImage", url)}
            folder={IMAGE_FOLDERS.PROJECT_HEROES}
            aspectRatio={ASPECT_RATIOS.HERO}
          />

          <ImageUpload
            label="Device Mockup"
            value={deviceMockup}
            onChange={(url) => setValue("deviceMockup", url)}
            folder={IMAGE_FOLDERS.PROJECT_MOCKUPS}
            aspectRatio={deviceType === DEVICE_TYPES.LAPTOP ? ASPECT_RATIOS.LAPTOP : ASPECT_RATIOS.MOBILE}
          />

          <div>
            <Label htmlFor="deviceType">Device Type</Label>
            <Select
              value={deviceType}
              onValueChange={(value) =>
                setValue("deviceType", value as "laptop" | "mobile")
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={DEVICE_TYPES.LAPTOP}>Laptop</SelectItem>
                <SelectItem value={DEVICE_TYPES.MOBILE}>Mobile</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Layout & Content</h2>
        <div className="grid gap-6">
          <div>
            <Label htmlFor="layoutVariant">Layout Variant</Label>
            <Select
              value={layoutVariant}
              onValueChange={(value) =>
                setValue("layoutVariant", value as "A" | "B" | "C" | "D" | "E" | "F")
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={LAYOUT_VARIANTS.A}>{LAYOUT_VARIANTS.A} - {LAYOUT_VARIANT_DESCRIPTIONS[LAYOUT_VARIANTS.A]}</SelectItem>
                <SelectItem value={LAYOUT_VARIANTS.B}>{LAYOUT_VARIANTS.B} - {LAYOUT_VARIANT_DESCRIPTIONS[LAYOUT_VARIANTS.B]}</SelectItem>
                <SelectItem value={LAYOUT_VARIANTS.C}>{LAYOUT_VARIANTS.C} - {LAYOUT_VARIANT_DESCRIPTIONS[LAYOUT_VARIANTS.C]}</SelectItem>
                <SelectItem value={LAYOUT_VARIANTS.D}>{LAYOUT_VARIANTS.D} - {LAYOUT_VARIANT_DESCRIPTIONS[LAYOUT_VARIANTS.D]}</SelectItem>
                <SelectItem value={LAYOUT_VARIANTS.E}>{LAYOUT_VARIANTS.E} - {LAYOUT_VARIANT_DESCRIPTIONS[LAYOUT_VARIANTS.E]}</SelectItem>
                <SelectItem value={LAYOUT_VARIANTS.F}>{LAYOUT_VARIANTS.F} - {LAYOUT_VARIANT_DESCRIPTIONS[LAYOUT_VARIANTS.F]}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="caseStudySlug">Custom Case Study Slug (Optional)</Label>
            <Input
              id="caseStudySlug"
              {...register("caseStudySlug")}
              placeholder="e.g., acme-corp, tech-startup"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Use this to enable a custom component-based case study layout. Leave empty to use markdown or coming soon.
            </p>
          </div>

          <div>
            <Label htmlFor="caseStudy">Case Study (Markdown - Legacy)</Label>
            <Textarea
              id="caseStudy"
              {...register("caseStudy")}
              placeholder="Write your case study in Markdown format..."
              rows={10}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Only used if no custom component exists. Leave empty if project is coming soon.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="comingSoon"
              checked={comingSoon}
              onCheckedChange={(checked) =>
                setValue("comingSoon", checked as boolean)
              }
            />
            <Label
              htmlFor="comingSoon"
              className="text-sm font-normal cursor-pointer"
            >
              Coming Soon (dim pill, no case study access)
            </Label>
          </div>
        </div>
      </Card>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />}
          {mode === "create" ? "Create Project" : "Save Changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/projects")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
