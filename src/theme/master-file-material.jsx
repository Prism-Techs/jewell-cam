import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import * as Icons from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from "@mui/material/ListItemIcon";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from "@mui/material/CardHeader";
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs';
import { styled, alpha } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/useMediaQuery";
import {
  DataGrid, GridToolbar, GridToolbarContainer, GridRow, GridCell,
  GridToolbarDensitySelector
} from "@mui/x-data-grid";
import Switch from "@mui/material/Switch";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from "@mui/material/Typography";
import CheckBox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Autocomplete from "@mui/material/Autocomplete";
import Pagination from "@mui/material/Pagination";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Radio from '@mui/material/Radio';
import RadioGroup from "@mui/material/RadioGroup";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FormHelperText from "@mui/material/FormHelperText";
import PropTypes from 'prop-types';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ThemeProvider } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { Collapse, FormLabel, Paper, Skeleton, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { CircularProgress } from "@mui/material"
import { Badge } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Stepper, Step, StepLabel, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Modal from '@mui/material/Modal';
import Popover from '@mui/material/Popover';
import { Zoom } from "@mui/material";
import Grid from '@mui/material/Grid';


// import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
// import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
// import { RichTreeView } from "@mui/x-tree-view/RichTreeView";

const Components = {
  Grid,
  Paper,
  Zoom,
  Modal,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButtonGroup,
  ToggleButton,
  GridRow,
  GridCell,
  GridToolbarDensitySelector,
  GridToolbarContainer,
  Collapse,
  // GridColDef,
  GridToolbar,
  Stepper,
  Step,
  StepLabel,
  InputLabel,
  // DemoContainer,
  // AdapterDayjs,
  Chip,
  PropTypes,
  Skeleton,
  Radio,
  RadioGroup,
  LoadingButton,
  FormHelperText,
  // LocalizationProvider,
  Icons,
  Box,
  DataGrid,
  OutlinedInput,
  Select,
  FormLabel,
  CircularProgress,
  ThemeProvider,
  FormControl,
  Pagination,
  CheckBox,
  Typography,
  TextField,
  Switch, FormGroup,
  FormControlLabel,
  InputAdornment,
  List,
  Badge,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CardHeader,
  Button,
  Autocomplete,
  Stack,
  useMediaQuery,
  useTheme,
  Tooltip,
  tooltipClasses,
  styled,
  alpha,
  Menu,
  MenuItem,
  ListItemIcon,
  Card,
  CardContent,
  CardActions,
  Tab,
  Tabs,
  TabContext,
  TabList,
  TabPanel,
  Drawer,
  Accordion,
  AccordionSummary,
  AccordionDetails,

};

export default Components;