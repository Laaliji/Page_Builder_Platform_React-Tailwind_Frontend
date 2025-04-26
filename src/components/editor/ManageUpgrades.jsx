import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X, RefreshCw, FileEdit } from "lucide-react";

const ManageUpgrades = ({ isOpen, onClose }) => {
  const [upgradedProjects, setUpgradedProjects] = useState({});
  const [projectInfo, setProjectInfo] = useState({});

  useEffect(() => {
    // Load upgraded projects from localStorage
    try {
      const storedProjects = JSON.parse(localStorage.getItem('upgradedProjects') || '{}');
      setUpgradedProjects(storedProjects);
      
      // For demo purposes, let's fetch project names
      // In a real app, this would come from an API
      fetchProjectNames(Object.keys(storedProjects));
    } catch (error) {
      console.error("Error loading upgraded projects:", error);
    }
  }, [isOpen]);

  // Simulates fetching project names from an API
  const fetchProjectNames = (projectIds) => {
    // Simulate API call with timeout
    setTimeout(() => {
      const mockProjects = {};
      projectIds.forEach(id => {
        mockProjects[id] = {
          name: `Project ${id.slice(0, 4)}...`,
          createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString()
        };
      });
      setProjectInfo(mockProjects);
    }, 300);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const toggleUpgradeStatus = (projectId) => {
    const updatedProjects = { ...upgradedProjects };
    if (updatedProjects[projectId]) {
      updatedProjects[projectId].active = !updatedProjects[projectId].active;
      setUpgradedProjects(updatedProjects);
      localStorage.setItem('upgradedProjects', JSON.stringify(updatedProjects));
    }
  };

  const deleteUpgrade = (projectId) => {
    const updatedProjects = { ...upgradedProjects };
    delete updatedProjects[projectId];
    setUpgradedProjects(updatedProjects);
    localStorage.setItem('upgradedProjects', JSON.stringify(updatedProjects));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Manage Project Upgrades
          </DialogTitle>
        </DialogHeader>

        {Object.keys(upgradedProjects).length > 0 ? (
          <div className="overflow-auto max-h-[60vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Purchase Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(upgradedProjects).map(([projectId, details]) => (
                  <TableRow key={projectId}>
                    <TableCell className="font-medium">
                      {projectInfo[projectId]?.name || `Project ${projectId.slice(0, 4)}...`}
                    </TableCell>
                    <TableCell>
                      <Badge variant={details.plan === "yearly" ? "default" : "outline"}>
                        {details.plan === "yearly" ? "Yearly" : "Monthly"}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(details.purchaseDate)}</TableCell>
                    <TableCell>
                      {details.active ? (
                        <Badge className="bg-green-500">Active</Badge>
                      ) : (
                        <Badge variant="outline" className="text-red-500 border-red-200">Inactive</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleUpgradeStatus(projectId)}
                        className={details.active ? "text-amber-500" : "text-green-500"}
                      >
                        {details.active ? (
                          <X className="h-4 w-4 mr-1" />
                        ) : (
                          <Check className="h-4 w-4 mr-1" />
                        )}
                        {details.active ? "Deactivate" : "Activate"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteUpgrade(projectId)}
                        className="text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <FileEdit className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No upgraded projects found</p>
          </div>
        )}

        <DialogFooter>
          <Button
            onClick={() => {
              localStorage.setItem('upgradedProjects', JSON.stringify({}));
              setUpgradedProjects({});
            }}
            variant="outline"
            className="mr-auto text-red-500"
          >
            Reset All
          </Button>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageUpgrades; 